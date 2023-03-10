export const PayuButtonTool = unlayer.createViewer({
  render(values) {
    const { size, paymentURL, alignment } = values;
    const buttonImgWidth =
      size === 'small' ? 116 : size === 'medium' ? 145 : 182;

    return `
      <div align=${alignment} role='container'>
        <a role='link' href=${paymentURL ? paymentURL : '#'} target='_blank'>
          <img
            style='width: ${buttonImgWidth}'
            src='payu_${size}_button'
            alt='payu_button'
          />
        </a>
      </div>
    `;
  },
});
