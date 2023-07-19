import {create} from "zustand";
import axios from "axios";

const UploadStore = create((set) => ({
    selectedFile: null,

    onChange: (event) => {
        const file = event.target.files[0]
        set({selectedFile: file})
    },

    onUpload: async () => {
        try{
            const formData = new FormData();
            const {selectedFile} = UploadStore.getState();
            formData.append('file', selectedFile);
            console.log(selectedFile);
            const response = await axios.post("http://localhost:8000/upload", formData)
            window.alert(response.status)
        }catch(err){
            console.log(err)
        }
    }
}))

export default UploadStore