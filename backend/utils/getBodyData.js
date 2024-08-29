function getBodyData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on('data', (chuck) => {
                body += chuck;
            })

            req.on('end', () => {
                resolve(JSON.parse(body));
            })

        } catch (error) {
            reject(error);
        }
    })
}

export {getBodyData}