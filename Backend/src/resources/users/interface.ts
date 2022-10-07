export default interface Folder{
    owner: string;
    folderName: string;
    folders: Array<string>;
    files: Array<string>;
}

export default interface File{
    owner: string;
    Name: string;
    size: number;
    contentType: string;
}
export default interface User{
    name: string;
    email: string;
    subscriptionType: string;
}
