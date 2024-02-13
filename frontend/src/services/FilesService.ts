export default class FileService {

    async uploadFile(file: string) {
      const response = await fetch("http://localhost:3000/api/files", {
        method: "POST",
        headers: {
            "Content-type":""
        },
        body: JSON.stringify({file})

      });
  
      return response;
    }
  }
  