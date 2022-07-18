class parseDamageMeterData {
    constructor(file) {
        this.file = file;
    };

    getAllMonsters() {
        return this.file.MONSTERS.map(el => {
            return {
                name: el.name,
                isQuestTarget: el.isQuestTarget,
                isHunted: el.hp.current ? false : true,
                damageData: el.damageSources ? this.getDamageData(el) : null
            }
        })
    }

    getPlayers() {
        return this.file.PLAYERINFO.map(el => {
            return {
                name: el.name,
                id: el.id,
                carts: el.carts
            }
        })
    }

    getQuestSuccess() {
        const success = !this.file.MONSTERS.some(x => x.isQuestTarget && x.hp.current > 0)
        return success
    }

    getDamageData(monster) {
        return monster.damageSources.flatMap(el => {
            if (!el.counters.PlayerWeapon.physical) {
                return []
            }
            return {
                id: el.id,
                physical: el.counters.PlayerWeapon.physical,
                elemental: el.counters.PlayerWeapon.elemental,
                firstStrike: el.counters.PlayerWeapon.firstStrike,
                maxHit: el.counters.PlayerWeapon.maxHit,
                numHit: el.counters.PlayerWeapon.numHit
            }
        })
    }
}


export default parseDamageMeterData