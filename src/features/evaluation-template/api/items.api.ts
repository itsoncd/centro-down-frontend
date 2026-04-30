import { api } from '@/lib/axios'


export const getItems = () =>
  api.get('/items').then(res => res.data)


type UploadFilesParams = {
  name: string,
  version: string,
  files: File[];
};

export const createItem =  async (payload: UploadFilesParams) => {
  const formData = new FormData();
  formData.append("name", payload.name)
  if (payload.files) {
    Array.from(payload.files).forEach((file) => {
      formData.append("files[]", file);
    });
  }

  return await api.post('/items', formData,{
    headers: {
      "Content-Type": undefined,
    },
  }
  ).then(res => res.data)
}
  