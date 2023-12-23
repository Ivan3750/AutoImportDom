const vscode = require('vscode');

function activate(context) {
    // Реєстрація команди
    let disposable = vscode.commands.registerCommand('extension.copyClass', function () {
        // Отримання тексту виділеного у редакторі
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);

            // Регулярний вираз для пошуку класу в HTML-тегу
            const classRegex = /class=["']([^"']+)["']/;
            const match = classRegex.exec(selectedText);

            if (match && match[1]) {
                const className = match[1];
                // Генерація JavaScript коду для вибраного класу
                const jsCode = `const Name = document.querySelector(".${className}");`;
                // Копіювання у буфер обміну
                vscode.env.clipboard.writeText(jsCode);
                vscode.window.showInformationMessage('Клас скопійовано в буфер обміну.');
            } else {
                vscode.window.showWarningMessage('Не вдалося знайти клас у виділеному HTML коді.');
            }
        }
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
