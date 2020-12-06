import {app, BrowserWindow, BrowserWindowConstructorOptions, protocol} from 'electron';
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib';
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer';
import AutoLaunch from 'auto-launch';

const isDevelopment = process.env.NODE_ENV !== 'production';

protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
]);

async function createWindow() {
    let windowOptions: BrowserWindowConstructorOptions = {
        width: 1024,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    }

    if (!isDevelopment) {
        windowOptions = {
            ...windowOptions,
            kiosk: true,
            fullscreen: true,
            frame: false,
            autoHideMenuBar: true,
            closable: false,
            minimizable: false,
            resizable: false
        }
    }

    const win = new BrowserWindow(windowOptions);

    if (!isDevelopment) {
        win.setMenu(null);
    }

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
        if (!process.env.IS_TEST) {
            win.webContents.openDevTools({mode: 'detach'});
        }
    } else {
        createProtocol('app');
        win.loadURL('app://./index.html');
    }
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        try {
            await installExtension(VUEJS_DEVTOOLS);
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString());
        }
    }
    createWindow();
});

const launcher = new AutoLaunch({
    name: 'Cocktail Robot'
});

if (isDevelopment) {
    launcher.disable();
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit();
            }
        });
    } else {
        process.on('SIGTERM', () => {
            app.quit();
        });
    }
} else {
    launcher.enable();
}
