import StorageController from './controller'
import express, {Request, Response} from 'express'

const storageController = new StorageController();
const router = express.Router();
//prototype routes
router.get('/', (req: Request, res: Response) => {
    res.send(`
      <html>
        <head></head>
        <body>
          <form method="POST" enctype="multipart/form-data">
            <input type="file" name="filefield"><br />
             <input type="file" name="filefield"><br />
            <input type="text" name="textfield"><br />
            <input type="submit">
          </form>
        </body>
      </html>
    `);
})
router.post('/', (req: Request, res: Response) => storageController.upload(req, res));
router.post('/createfolder', (req: Request, res: Response) => storageController.createFolder(req, res))
router.post('/rename', (req: Request, res: Response) => storageController.rename(req, res))
router.post("/delete/:id", (req: Request, res: Response) => storageController.delete(req, res) )
export default router;
