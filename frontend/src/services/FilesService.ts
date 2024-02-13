export default class FileService {

    async uploadFile(file: any) {

      const formData = new FormData();
    formData.append('file', file);
      const response = await fetch(process.env.REACT_APP_BACKEND_URL+"api/files", {
        method: "POST",
        headers: {
        },
        body: formData

      });
  
      return response;
    }
  }
  