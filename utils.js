import {fileURLToPath} from 'url';
import {dirname} from 'path'; 
import fs from 'fs';

const filename= fileURLToPath(import.meta.url);
const __dirname = dirname(filename); 

export async function saveMsg(str) {
    try{
        let data = await fs.promises.readFile(__dirname+'/files/messages.txt', 'utf-8');
        console.log('esto resulta de leer', data);
        let dataObj = JSON.parse(data);
        dataObj.push(str);
            try{
                await fs.promises.writeFile(__dirname+'/files/messages.txt', JSON.stringify(dataObj, null, 2));
                return {status: "success", message: "El mensaje se añadio con exito", data: dataObj}
            } catch(err) {
                return {status: "error", message: "No se pudo añadir el mensaje ", err};
            }
        
    } catch(err){
        try {
            console.log('va directo al catch');
            await fs.promises.writeFile(__dirname+'/files/messages.txt', JSON.stringify([str], null, 2));
            return {status:"success", message: "El mensaje se añadio con exito"};
        } catch(err) {
            return {status: "error", message: `No se pudo añadir el mensaje a carpeta inexistente: ${__dirname}/files/messages.txt`, err}
        }
}
}

export default __dirname;