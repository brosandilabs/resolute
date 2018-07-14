'use strict';

module.exports = {
    retry(fn, options = {}) {
        // set default attempts
        options._attempts = 1;

        // set default backoff policy
        if(!options.backoff_policy) {
            options.backoff_policy = 'constant';
        }

        // set default backoff duration
        if(!options.backoff_duration) {
            options.backoff_duration = 1500;
        }

        const _retry = async (...args) => {
            try {
                return await fn(...args);
            } catch(err) {
                if(options.max_retries === undefined || options._attempts < options.max_retries) {
                    let backoff;

                    if(options.backoff_policy === 'exponential') {
                        backoff = Math.pow((options.backoff_duration / 1000), options._attempts) * 1000;
                    } else if(options.backoff_policy === 'linear') {
                        backoff = options.backoff_duration * options._attempts;
                    } else {
                        backoff = options.backoff_duration * 1;
                    }

                    options._attempts++;

                    return setTimeout(async () => {
                        return await _retry(...args);
                    }, backoff);
                } else {
                    throw err;
                }
            }
        }

        return async (...args) => {
            return await _retry(...args);
        };
    }
};
