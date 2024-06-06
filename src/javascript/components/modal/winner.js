import showModal from './modal';
import { createFighterImage } from '../fighterPreview';
import createElement from '../../helpers/domHelper';

export default function showWinnerModal(fighter) {
    // call showModal function
    const container = createElement({
        tagName: 'div',
        className: ''
    });
    const img = createFighterImage(fighter);
    const name = createElement({
        tagName: 'p',
        className: ''
    });
    name.innerText = fighter.name;
    container.append(img, name);
    showModal({
        title: `Winner is ${fighter.name}`,
        bodyElement: container
    });
}
