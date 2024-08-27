function setErrors(error) {
  let errors = {}
  if (error?.response?.data?.errors) {
      error.response.data.errors.forEach(value => {
        let name = value.path
        errors[name] = value.msg
      })

      return errors
  }

  if (error.inner) {
      error.inner.forEach(value => {
          let array = [value.params.label, value.errors[0]]
          errors[array[0]] = array[1]
      })
      return errors
  }

  return error
}

export {setErrors}
