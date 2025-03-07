import subProcess from 'child_process';

const service = {
  tk: async () => {
    return new Promise((resolve, reject) => {
      const nk = subProcess.spawn('nk', ['-gen', 'user', '-pubout']);
      nk.on('error', (data: unknown) => {
        reject(data);
      });
      nk.stderr.on('data', (data: unknown) => {
        reject(data);
      });
      nk.stdout.on('data', (data: AllowSharedBufferSource) => {
        const nk_out = new TextDecoder().decode(data).split('\n');
        resolve({ accountName: nk_out[1], password: nk_out[0] });
      });
    });
  }
};

export default service;
