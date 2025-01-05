export function isEmpty(obj) {
    if (!obj) {
        return true;
    }
    return Object.keys(obj).length === 0;
}

export function getImage (profilePic) {
    let binary = "";
    const bytes = new Uint8Array(profilePic?.data?.data);
    const len = bytes.byteLength;
  
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    let base64String = window.btoa(binary);

    return `data:${profilePic?.contentType};base64,${base64String}`;
}