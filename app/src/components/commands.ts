import subProcess from 'child_process';
import { NkResult } from '../types/NkResult';

export const nk = async () => {
  return new Promise<NkResult>((resolve, reject) => {
    let dataBuffer = '';
    const nk = subProcess.spawn('nk', ['-gen', 'user', '-pubout']);
    nk.on('error', (data: unknown) => {
      reject(data);
    });
    nk.stderr.on('data', (data: unknown) => {
      reject(data);
    });
    nk.stdout.on('data', (data: AllowSharedBufferSource) => {
      // on some systems (Openshift) it takes multiple calls to get the complete nk output
      const nk_out = new TextDecoder().decode(data);
      // build the complete dataset...
      dataBuffer = dataBuffer + nk_out;
    });
    nk.on('close', (code) => {
      if (0 === code) {
        // on close we should have all the data...
        const password = dataBuffer.substring(0, 58).trim();
        const accountName = dataBuffer.substring(59).trim();
        const result: NkResult = { accountName: accountName, password: password };
        resolve(result);
      } else {
        reject(code);
      }
    });
  });
};

export default nk;
