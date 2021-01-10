const React = require('react');
const ReactDom = require('react-dom');

//const WordRelay = require('./WordRelay');
const WordRelayHook = require('./WordRelayHook');
ReactDom.render(<WordRelayHook />, document.querySelector("#root"));
