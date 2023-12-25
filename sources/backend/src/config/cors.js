const cors = require('cors');
const configCORS = (app) => {
    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true,            //access-control-allow-credentials:true
        optionSuccessStatus: 200
    }
    app.use(cors(corsOptions));

}
export default configCORS