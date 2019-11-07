import { Erros } from '../utilities';

export function InputValidator(formName, field, validatorFieldName) {
  const errors = Erros;
  let validationItem = {
    type: '',
    message: ''
  };
  errors[validatorFieldName].find((item) => {
    if (
      formName.get(field).hasError(item.type) &&
      (formName.get(field).dirty ||
      formName.get(field).touched)
    ) {
      // console.log('without submit', item, formName, field, validatorFieldName, formSubmitStatus);
      validationItem = item;
      return item;
    // } else if (
    //   formSubmitStatus &&
    //   formName.get(field).hasError(item.type)
    // ) {
    //   // console.log('submits', item, formName, field, validatorFieldName, formSubmitStatus);
    //   validationItem = item;
    //   return item;
    }
  });
  return validationItem;
}
