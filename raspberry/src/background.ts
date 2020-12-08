import {app, BrowserWindow, BrowserWindowConstructorOptions, protocol} from 'electron';
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib';
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer';
import AutoLaunch from 'auto-launch';

const isDevelopment = process.env.NODE_ENV !== 'production';

protocol.registerSchemesAsPrivileged([
    {
        scheme: 'app',
        privileges: {
            secure: true, standard: true
        }
    }
]);

async function createWindow() {
    let windowOptions: BrowserWindowConstructorOptions = {
        webPreferences: {
            nodeIntegration: true
        }
    };

    if (isDevelopment) {
        windowOptions = {
            ...windowOptions,
            width: 1024,
            height: 656,
            resizable: false,
            maximizable: false
        };
    } else {
        windowOptions = {
            ...windowOptions,
            kiosk: true,
            frame: false,
            minimizable: false,
            closable: false
        };
    }

    const win = new BrowserWindow(windowOptions);

    if (!isDevelopment) {
        win.setMenu(null);
        win.webContents.on('dom-ready', () => {
            win.webContents.insertCSS('* {cursor:none !important;}');
        });
    }

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
        if (!process.env.IS_TEST) {
            win.webContents.openDevTools({
                mode: 'detach'
            });
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

app.on('ready', async() => {
    if (isDevelopment && !process.env.IS_TEST) {
        try {
            await installExtension(VUEJS_DEVTOOLS);
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString());
        }
    }
    createWindow();
});

if (isDevelopment) {
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
    const launcher = new AutoLaunch({
        name: 'Cocktail Robot'
    });
    launcher.enable();
}
