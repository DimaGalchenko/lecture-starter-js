import controls from '../../constants/controls';

export function getHitPower(fighter) {
    // return hit power
    const criticalHitChance = Math.random() + 1;
    return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    // return block power
    const dodgeChance = Math.random() + 1;
    return fighter.defense * dodgeChance;
}

export function getDamage(attacker, defender) {
    // return damage
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return damage < 0 ? 0 : damage;
}

export async function fight(firstFighter, secondFighter) {
    const critRefresh = 10 * 1000;

    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over
        const healthBars = [...document.getElementsByClassName('arena___health-bar')];
        const playerOne = {
            ...firstFighter,
            healthBar: healthBars[0],
            isBlocked: false,
            currentHealth: 100,
            lastCriticalAttackAt: null,
            downButtonsToCriticalAttack: new Set()
        };
        const playerTwo = {
            ...secondFighter,
            healthBar: healthBars[1],
            isBlocked: false,
            currentHealth: 100,
            lastCriticalAttackAt: null,
            downButtonsToCriticalAttack: new Set()
        };

        function getCriticalDamage(attacker) {
            if (!attacker.lastCriticalAttackAt || Date.now() - attacker.lastCriticalAttackAt > critRefresh) {
                // eslint-disable-next-line no-param-reassign
                attacker.lastCriticalAttackAt = Date.now();
                return attacker.attack * 2;
            }
            return 0;
        }

        function decreaseDefenderHealthLevel(defender) {
            // eslint-disable-next-line no-param-reassign
            defender.healthBar.style.width = `${defender.currentHealth}%`;
        }

        function handleAttack(attacker, defender, isCritical = false) {
            if (attacker.isBlocked) {
                return;
            }
            const damage = isCritical ? getCriticalDamage(attacker) : getDamage(attacker, defender);
            if (damage !== 0 && !defender.isBlocked) {
                const healthPointsPerPercentage = defender.health / 100;
                const damageInPercentage = damage / healthPointsPerPercentage;
                if (defender.currentHealth - damageInPercentage <= 0) {
                    // eslint-disable-next-line no-param-reassign
                    defender.currentHealth = 0;
                    decreaseDefenderHealthLevel(defender);
                    // eslint-disable-next-line no-use-before-define
                    document.removeEventListener('keydown', onKeyDown);
                    // eslint-disable-next-line no-use-before-define
                    document.removeEventListener('keyup', onKeyUp);
                    resolve(attacker);
                } else {
                    // eslint-disable-next-line no-param-reassign
                    defender.currentHealth -= damageInPercentage;
                    decreaseDefenderHealthLevel(defender);
                }
            }
        }

        function onKeyDown(event) {
            // eslint-disable-next-line default-case
            switch (event.code) {
                case controls.PlayerOneAttack:
                    handleAttack(playerOne, playerTwo);
                    break;
                case controls.PlayerTwoAttack:
                    handleAttack(playerTwo, playerOne);
                    break;
                case controls.PlayerOneBlock:
                    playerOne.isBlocked = true;
                    break;
                case controls.PlayerTwoBlock:
                    playerTwo.isBlocked = true;
                    break;
            }
            if (controls.PlayerOneCriticalHitCombination.includes(event.code)) {
                playerOne.downButtonsToCriticalAttack.add(event.code);
            }
            if (playerOne.downButtonsToCriticalAttack.size === controls.PlayerOneCriticalHitCombination.length) {
                handleAttack(playerOne, playerTwo, true);
            }
            if (controls.PlayerTwoCriticalHitCombination.includes(event.code)) {
                playerTwo.downButtonsToCriticalAttack.add(event.code);
            }
            if (playerTwo.downButtonsToCriticalAttack.size === controls.PlayerTwoCriticalHitCombination.length) {
                handleAttack(playerTwo, playerOne, true);
            }
        }

        document.addEventListener('keydown', onKeyDown);

        function onKeyUp(event) {
            // eslint-disable-next-line default-case
            switch (event.code) {
                case controls.PlayerOneBlock:
                    playerOne.isBlocked = false;
                    break;
                case controls.PlayerTwoBlock:
                    playerTwo.isBlocked = false;
                    break;
            }
            if (controls.PlayerOneCriticalHitCombination.includes(event.code)) {
                playerOne.downButtonsToCriticalAttack.delete(event.code);
            }
        }

        document.addEventListener('keyup', onKeyUp);
    });
}
