class Util {
    constructor() {
        throw new Error(`${this.constructor.name} May not be instantiated`);
    }
    static ms(ms) {
        if (typeof ms !== "number") throw new Error(`Milisaniyelerin bir sayı olması beklenen, alındı ${typeof ms}!`);

        const apply = ms > 0 ? Math.floor : Math.ceil;
        return {
            days: apply(ms / 86400000),
            hours: apply(ms / 3600000) % 24,
            minutes: apply(ms / 60000) % 60,
            seconds: apply(ms / 1000) % 60,
            milliseconds: apply(ms) % 1000,
            microseconds: apply(ms * 1000) % 1000,
            nanoseconds: apply(ms * 1e6) % 1000
        }
    }
    static getCooldown(cooldownTime, collectedTime) {
        if (cooldownTime instanceof Date) cooldownTime = cooldownTime.getTime();
        if (collectedTime instanceof Date) collectedTime = collectedTime.getTime();
        if (typeof cooldownTime !== "number") throw new Error(`Expected cooldownTime to be a number, received ${typeof cooldownTime}!`);
        if (typeof collectedTime !== "number") throw new Error(`Expected collectedTime to be a number, received ${typeof collectedTime}!`);

        if (collectedTime !== null && cooldownTime - (Date.now() - collectedTime) > 0) return Util.ms(cooldownTime - (Date.now() - collectedTime));
        return Util.ms(0);
    }
    static onCooldown(cooldownTime, collectedTime) {
        if (cooldownTime instanceof Date) cooldownTime = cooldownTime.getTime();
        if (collectedTime instanceof Date) collectedTime = collectedTime.getTime();
        if (typeof cooldownTime !== "number") throw new Error(`Expected cooldownTime to be a number, received ${typeof cooldownTime}!`);
        if (typeof collectedTime !== "number") throw new Error(`Expected collectedTime to be a number, received ${typeof collectedTime}!`);

        if (collectedTime !== null && cooldownTime - (Date.now() - collectedTime) > 0) return true;
        return false;
    }
    static parseKey(key) {
        if (!key) throw new Error("Invalid key");
        const chunk = key.split("_");
        if (chunk.length >= 3) {
            const obj = {
                prefix: chunk[0],
                guildID: chunk[1],
                userID: chunk[2]
            };
            return obj;
        } else {
            const obj = {
                prefix: chunk[0],
                guildID: null,
                userID: chunk[1]
            };
            return obj;
        }
    }
    static makeKey(user, guild, prefix) {
        return `${prefix}_${guild ? guild + "_" : ""}${user}`;
    }
    static random(from, to) {
        if (typeof from !== "number" || typeof to !== "number") return 0;
        const amt = Math.floor(Math.random() * (to - from + 1)) + from;
        return amt;
    }
    static get COOLDOWN() {
        return {
            DAILY: 86400000,
            WEEKLY: 604800000,
            WORK: 2700000,
            BEG: 60000,
            MONTHLY: 2628000000,
            SEARCH: 300000
        };
    }
    static get MYSQL_OPTIONS() {
        return {
            table: 'money',
            database: '',
            user: '',
            password: '',
            host: '',
            port: 3306,
            additionalOptions: {}
        }
    }
    static get MONGO_OPTIONS() {
        return {
            schema: 'userBalance',
            collection: 'money',
            additionalOptions: {}
        }
    }
    static get SQLITE_OPTIONS() {
        return {
            table: 'money',
            filename: 'kral',
            sqliteOptions: {}
        }
    }
};
module.exports = Util;