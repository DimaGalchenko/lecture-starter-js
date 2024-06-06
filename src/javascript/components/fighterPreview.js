import createElement from '../helpers/domHelper';

function createVersusFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

function createNameValueElement(propertyName, propertyValue) {
    const element = createElement({
        tagName: 'p'
    });
    element.innerText = `${propertyName}: ${propertyValue}`;
    return element;
}

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    if (!fighter) {
        return fighterElement;
    }

    const fighterImgElement = createVersusFighterImage(fighter);
    fighterElement.append(fighterImgElement);

    const fighterInfoContainer = createElement({
        tagName: 'div',
        className: 'fighter-preview___info-container'
    });

    fighterInfoContainer.append(createNameValueElement('Name', fighter.name));
    fighterInfoContainer.append(createNameValueElement('Health', fighter.health));
    fighterInfoContainer.append(createNameValueElement('Attack', fighter.attack));
    fighterInfoContainer.append(createNameValueElement('Defense', fighter.defense));
    fighterElement.append(fighterInfoContainer);

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
