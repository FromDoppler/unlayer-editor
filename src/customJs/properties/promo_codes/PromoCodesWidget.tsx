import { React, useEffect, useState } from '../../unlayer-react';
import { WidgetComponent } from '../../types';
import {
  PromoCodesValue,
  StoreDependentToolValues,
} from './types';
import { EMPTY_SELECTION } from '../../constants';
import { addUnlayerLabel } from '../../components/UnlayerLabel';

type CodeOption = { value: string; label: string };

let lastRequestId = 0;
const getRequestId = () => lastRequestId++;

export const PromoCodesWidget: WidgetComponent<
  PromoCodesValue,
  StoreDependentToolValues
> = addUnlayerLabel(({ value, updateValue, values: { store } }) => {
  const [loading, setLoading] = useState(false);
  const [codeOptions, setCodeOptions] = useState<CodeOption[]>([]);

  useEffect(() => {
    if (store === EMPTY_SELECTION) {
      setLoading(false);
      setCodeOptions([]);
      return;
    }

    setLoading(true);

    // TODO: encapsulate it
    const requestId = getRequestId();

    window.top?.postMessage(
      {
        requestId,
        action: 'getPromoCodes',
        store,
      },
      { targetOrigin: '*' },
    );

    const listener = (message: any) => {
      console.log({ requestId, message });
      if (
        message.data.isResponse === true &&
        requestId === message.data.requestId
      ) {
        setCodeOptions(message.data.value);
        setLoading(false);
      }
    };

    window.addEventListener('message', listener);

    return () => {
      window.removeEventListener('message', listener);
    };
  }, [store]);

  // TODO: show a spinner or something
  if (loading) {
    return <div>LOADING...</div>;
  }

  // TODO: show the options as radio buttons
  return (
    <ul>
      {codeOptions.map((x) => (
        <li key={x.value} onClick={() => updateValue(x.value)}>
          {x.value === value ? '[x]' : '[ ]'} {x.label}
        </li>
      ))}
    </ul>
  );
});

// // TODO: run this code in the page (outside the iframe)
// window.addEventListener(
//   'message',
//   ({ origin, data: { action, requestId, store } }) => {
//     if (origin !== 'https://editor.unlayer.com') {
//       return;
//     }

//     if (action !== 'getPromoCodes') {
//       return;
//     }

//     window.frames[0].postMessage(
//       {
//         isResponse: true,
//         requestId: requestId,
//         value: [
//           {
//             label: `10% off (${store})`,
//             value: `${store}-10abc`,
//           },
//           {
//             label: `20% off (${store})`,
//             value: `${store}-20cde`,
//           },
//           {
//             label: `30% off (${store})`,
//             value: `${store}-30efg`,
//           },
//         ],
//       },
//       { targetOrigin: '*' },
//     );
//   },
// );
