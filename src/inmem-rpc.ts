import * as myfs from 'fs';

export const rpc = {
    'fs': {
        'readFile': async (path: string) => {
            try {
                return myfs.readFileSync(path);
            }
            catch (error) {
                console.error(`Error reading file at ${path}:`, error);
                throw error;
            }
        },
        'writeFile': async (path: string, data: string | Buffer) => {
            try {
                myfs.writeFileSync(path, data);
                return { success: true };
            }
            catch (error) {
                console.error(`Error writing file at ${path}:`, error);
                throw error;
            }
        }
    }
};
