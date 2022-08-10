import {app, protocol, BrowserWindow, BrowserWindowConstructorOptions} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS3_DEVTOOLS} from 'electron-devtools-installer'
import AutoLaunch from 'auto-launch';

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])

async function createWindow() {
    let windowOptions: BrowserWindowConstructorOptions = {
        webPreferences: {
            nodeIntegration: !!process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
        }
    };

    if (isDevelopment) {
        windowOptions = {
            ...windowOptions,
            width: 1024,
            height: 656,
            resizable: false,
            maximizable: false,
            webPreferences: {
                ...windowOptions.webPreferences,
                zoomFactor: 1.3
            }
        };
    } else {
        windowOptions = {
            ...windowOptions,
            kiosk: true,
            frame: false,
            minimizable: false,
            closable: false,
            alwaysOnTop: true
        };
    }

    const window = new BrowserWindow(windowOptions)

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await window.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) {
            window.webContents.openDevTools({mode: 'undocked'})
        }
    } else {
        createProtocol('app')
        window.loadURL('app://./index.html')
    }
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.on('ready', async() => {
    if (isDevelopment && !process.env.IS_TEST) {
        try {
            await installExtension(VUEJS3_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', (e as Error).toString())
        }
    }
    createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
} else {
    const launcher = new AutoLaunch({
        name: 'Cocktail Robot'
    });
    launcher.enable();
}
