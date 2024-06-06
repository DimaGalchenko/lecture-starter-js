import showModal from './modal';
import { createFighterImage } from '../fighterPreview';

export default function showWinnerModal(fighter) {
    // call showModal function
    showModal({
        title: `Winner is ${fighter.name}`,
        bodyElement: createFighterImage(fighter)
    });
}
