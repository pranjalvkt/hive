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

export const calculateTimeAgo = (createdAt) => {
    const currentTime = new Date();
    const creationTime = new Date(createdAt);

    const timeDifference = currentTime - creationTime;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let timeAgo = '';
    if (days > 0) {
      timeAgo = `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      timeAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      timeAgo = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      timeAgo = `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }

    return timeAgo;
  };