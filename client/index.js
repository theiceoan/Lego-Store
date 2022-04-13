import { init } from './auth0.js';
import { pageLoaded } from './lego-pieces.js';

window.addEventListener('load', init);
window.addEventListener('load', pageLoaded);
