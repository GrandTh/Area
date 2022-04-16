import './css/dlAPK_comp.css'
import Download from '@mui/icons-material/Download';

function dlAPK_comp() {
    return (
        <div className="APK_wrapper">
            <div className="btn_dl_wrapper" alt="Download">
                <Download style={{ color: '#fff', height: "500px", width: "500px" }}/>
            </div>
        </div>
    );
}

export default dlAPK_comp;
