import { onBeforeUnmount, Ref, ref } from 'vue';
import { useEventListener } from '@vueuse/core';

type Props = {
    elRef: Ref<Element | null>;
    callback: () => void;
};

const useClickOutside = ({ elRef, callback }: Props): void => {
    const isInside = ref(false);

    const handleLeave = () => {
        isInside.value = false;
    };

    const handleEnter = () => {
        isInside.value = true;
    };

    const handleClickOutside = () => {
        if (!isInside.value) {
            callback();
        }
    };

    useEventListener(document.body, 'click', handleClickOutside);
    useEventListener(elRef, 'mouseleave', handleLeave);
    useEventListener(elRef, 'mouseenter', handleEnter);

    onBeforeUnmount(() => {
        if (elRef.value) {
            elRef.value = null;
        }
    });
};

export default useClickOutside;
