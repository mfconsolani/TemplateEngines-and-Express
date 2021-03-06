"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handlerClass_1 = __importDefault(require("./handlerClass"));
// Server set-up
const app = express_1.default();
const PORT = 8080;
// Global variables
const router = express_1.default.Router();
let db = [];
let instance = new handlerClass_1.default(db);
// Middleware
app.use(express_1.default.static(__dirname + '/public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`);
});
server.on("Error", (error) => {
    console.log(`Se produjo el siguiente error al inicializar el servidor: ${error}`);
});
// Get requests
// Listar todos los productos
router.get('/productos', (req, res) => {
    instance.displayAll(res);
});
// Listar un producto específico
router.get('/productos/:id', (req, res) => {
    instance.displayOne(req, res);
});
// Post requests
// Cargar un nuevo producto
router.post('/productos/', (req, res) => {
    instance.saveProduct(req, res);
});
// Put requests
// Reemplzar datos
router.put('/productos/:id', (req, res) => {
    instance.replaceData(req, res);
});
// Delete requests
// Elimina un producto
router.delete('/productos/:id', (req, res) => {
    instance.deleteItem(req, res);
});
// Router
app.use('/api', router);
// Server Port config
