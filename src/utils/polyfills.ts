if (!Array.prototype.includes) {
    Array.prototype.includes = function (element: any) {
        return this.indexOf(element) !== -1;
    };
}

if (!Object.assign) {
    Object.assign = function (target: any, ...sources: any[]) {
        sources.forEach((source) => {
            for (let key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        });
        return target;
    };
}

export {};
