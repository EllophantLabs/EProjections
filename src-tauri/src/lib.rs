use tauri::Manager;
use tauri::{AppHandle, Emitter, WebviewUrl, WebviewWindowBuilder};
use tauri_plugin_dialog::DialogExt;
use tauri_plugin_updater::UpdaterExt;

mod data_stream;
use crate::data_stream::create_new_project;
use crate::data_stream::get_file_src;
use crate::data_stream::get_media_path;
use crate::data_stream::load_asset_names;
use crate::data_stream::load_layout;
use crate::data_stream::open_project_folder;
use crate::data_stream::save_empty_layout;
use crate::data_stream::save_layout;
use crate::data_stream::set_project_path;
use crate::data_stream::ProjectDir;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

//* search for updates */
async fn check_for_updates(handle: AppHandle, window: tauri::WebviewWindow) {
    let updater = handle.updater().expect("Updater-Plugin nicht geladen");

    match updater.check().await {
        // ok -> there is a new update!
        Ok(Some(update)) => {
            let (tx, rx) = std::sync::mpsc::channel();

            // create update dialog
            handle
                .dialog()
                .message(format!(
                    "Version {} ist verfügbar. Jetzt installieren?",
                    update.version
                ))
                .title("Update verfügbar")
                .buttons(tauri_plugin_dialog::MessageDialogButtons::OkCancelCustom(
                    "Installieren".into(),
                    "Später".into(),
                ))
                .show(move |result| {
                    let _ = tx.send(result);
                });

            // wait for user response!
            if rx.recv().unwrap_or(false) {
                window.emit("start_update", true).unwrap(); // lock starting window with update info!

                // download and install
                match update.download_and_install(|_, _| {}, || {}).await {
                    Ok(_) => {
                        handle.restart();
                    }
                    Err(e) => {
                        eprintln!("{}", e);
                        window.emit("start_unlock", false).unwrap(); // starting window -> notification: download failed -> Internet?
                    }
                }
            } else {
                window.emit("start_update", false).unwrap(); // starting window unlock -> notification: new updated aviable!
            }
        }
        // ok -> no new updated found!
        Ok(None) => {
            println!("App ist auf dem neuesten Stand.");
            window.emit("start_unlock", true).unwrap(); // unlock starting window -> no
        }
        // err -> failed to check for updated! // Internetconnection?
        Err(e) => {
            eprintln!("Fehler beim Update-Check: {}", e);
            window.emit("start_unlock", false).unwrap(); // starting window -> notification: check failed -> Internet?
        }
    }
}

//* window closing hook */
fn close_windows(app: &AppHandle, label: &str) {
    // starting window is closed!
    if label == "starting-window" {
        // check for main window -> close too!
        if let Some(main_window) = app.get_webview_window("main") {
            let is_visible = main_window.is_visible().unwrap_or(false);
            if !is_visible {
                println!("Main ist unsichtbar, beende App.");
                app.exit(0);
            } else {
                println!("Main ist bereits offen, schließe nur Start-Fenster.");
            }
        } else {
            // if there is no main
            app.exit(0);
        }
    }

    // main window is closed!
    if label == "main" {
        app.exit(0);
    }
}

//* close starting window */
#[tauri::command]
async fn close_start_window(app: AppHandle) {
    if let Some(window) = app.get_webview_window("starting-window") {
        window.close().unwrap();
    }
}

//#region presentation window / sec-window

//* open presentation window */
#[tauri::command]
async fn open_window(app: AppHandle) {
    // search through all monitors available
    let monitors = app.available_monitors().unwrap();
    let target_monitor = monitors.get(1).unwrap_or(&monitors[0]);
    let monitor_pos = target_monitor.position();

    //create second Monitor for presentation
    let window =
        WebviewWindowBuilder::new(&app, "second-window", WebviewUrl::App("SecWindow/".into()))
            .title("presentation-screen")
            .position(monitor_pos.x as f64, monitor_pos.y as f64)
            .inner_size(600.0, 400.0)
            .fullscreen(false)
            .always_on_top(true)
            .decorations(false)
            .skip_taskbar(true)
            .build()
            .unwrap();

    if let Some(_monitor) = monitors.get(1) {
        window.set_fullscreen(true).unwrap();
    } else {
        window.set_fullscreen(false).unwrap();
    }

    window.set_cursor_visible(false).unwrap();
    window.set_always_on_top(true).unwrap();
}

//* close presentation window */
#[tauri::command]
async fn close_sec_window(app: AppHandle) {
    if let Some(window) = app.get_webview_window("second-window") {
        window.close().unwrap();
    }
}

//* hide presentation window */
#[tauri::command]
async fn hide_sec_window(app: AppHandle) {
    if let Some(window) = app.get_webview_window("second-window") {
        window.hide().unwrap();
    }
}

//* show/unhide presentation window */
#[tauri::command]
async fn show_sec_window(app: AppHandle) {
    if let Some(window) = app.get_webview_window("second-window") {
        window.show().unwrap();
    }
}

//#endregion

//* show/unhide main window */
#[tauri::command]
async fn open_main_window(app: AppHandle) {
    if let Some(window) = app.get_webview_window("main") {
        window.show().unwrap();

        window.set_focus().unwrap();
    }
}

//* close main window */
#[tauri::command]
async fn close_main_window(app: AppHandle) {
    if let Some(window) = app.get_webview_window("main") {
        window.close().unwrap();
    }
}

//* main run function */
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .manage(ProjectDir {
            path: std::sync::OnceLock::new(),
        })
        .setup(|app| {
            // create async handle for update checking
            let handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                if let Some(window) = handle.get_webview_window("main") {
                    check_for_updates(handle, window).await;
                }
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            open_window,
            open_main_window,
            set_project_path,
            get_media_path,
            create_new_project,
            load_asset_names,
            get_file_src,
            save_layout,
            save_empty_layout,
            load_layout,
            close_sec_window,
            hide_sec_window,
            show_sec_window,
            close_main_window,
            close_start_window,
            open_project_folder
        ])
        .on_window_event(|window, event| {
            if let tauri::WindowEvent::CloseRequested { .. } = event {
                let label = window.label();
                let app = window.app_handle();

                close_windows(app, label);
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
