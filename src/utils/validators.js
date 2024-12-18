export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePassword(password) {
  return password.length >= 8
}

export function validateFileType(file, allowedTypes) {
  return allowedTypes.includes(file.type)
}

export function validateFileSize(file, maxSize) {
  return file.size <= maxSize
}
