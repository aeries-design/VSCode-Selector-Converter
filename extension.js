// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "classconversion" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('classconversion.convertClass', function () {
		// The code you place here will be executed every time your command is executed

		const editor = vscode.window.activeTextEditor;
		let cursorPosition = editor.selection.start;
		let wordRange = editor.document.getWordRangeAtPosition(cursorPosition);
		let highlight = editor.document.getText(wordRange);
		let selection = editor.selection;
		let text = editor.document.getText(selection);
		// highlight will now contain the currently highlighted word
		
		var removeFirstDot = text.replace('.', '');
		var convertDotsToSpaces = removeFirstDot.replace(/\./g,' ')
		var addParentheses = '(class="' + convertDotsToSpaces + '")';

		editor.edit(builder => builder.replace(selection, addParentheses))

		// Display a message box to the user
		//vscode.window.showInformationMessage('Converted CSS dot notation to parenthetical attribute classes.');
		vscode.window.showInformationMessage(highlight);
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
