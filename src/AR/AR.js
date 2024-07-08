import { useState, useEffect } from 'react';

/**
 * Fetches the contents of a folder from the GitHub repository.
 * @param {string} folderUrl - The URL of the folder in the GitHub repository.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of folder contents.
 */
const getFolderContents = async (folderUrl) => {
  const response = await fetch(folderUrl, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'request',
    },
  });
  if (!response.ok) {
    return null;
  }
  return response.json();
};

/**
 * Finds a file in the folder contents with one of the specified extensions.
 * @param {Object[]} folderContents - The contents of the folder.
 * @param {string[]} extensions - An array of file extensions to search for.
 * @returns {Object|null} - The file object if found, otherwise null.
 */
const findFileWithExtensions = (folderContents, extensions) => {
  return folderContents.find(file => 
    extensions.some(ext => file.name.endsWith(ext))
  );
};

/**
 * Finds a file in the folder contents with the specified extension.
 * @param {Object[]} folderContents - The contents of the folder.
 * @param {string} extension - The file extension to search for.
 * @returns {Object|null} - The file object if found, otherwise null.
 */
const findFileWithExtension = (folderContents, extension) => {
  return folderContents.find(file => file.name.endsWith(extension));
};

/**
 * Hook that manages the AR scene's state and interactions.
 * 
 * @returns {Object} The visibility state of the AR scene, and functions to toggle this state and handle button clicks for model swapping.
 */
export const AR = () => {
    const [showPopup, setShowPopup] = useState(true);
    const [filesLinks, setFilesLinks] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            const repositoryOwner = "ahmedmansour3548";
            const repositoryName = "MRInteractiveWallPage";
            const baseUrl = `https://api.github.com/repos/${repositoryOwner}/${repositoryName}/contents`;

            try {
                const filesLinks = {};

                for (let folderNumber = 1; ; folderNumber++) {
                    const folderUrl = `${baseUrl}/${folderNumber}`;
                    const folderContents = await getFolderContents(folderUrl);

                    if (!folderContents) {
                        break; // No more numbered folders found
                    }

                    const modelFile = findFileWithExtensions(folderContents, [".gltf", ".glb"]);
                    const patternFile = findFileWithExtension(folderContents, ".patt");
                    const parameterFile = findFileWithExtension(folderContents, ".json");

                    const folderData = {};
                    if (modelFile) folderData["model"] = modelFile.download_url;
                    if (patternFile) folderData["pattern"] = patternFile.download_url;
                    if (parameterFile) folderData["param"] = parameterFile.download_url;

                    filesLinks[folderNumber] = folderData;
                }

                setFilesLinks(filesLinks);
                console.log("Files links:", filesLinks);
            } catch (error) {
                console.error('Error fetching files links:', error);
            }
        };

        fetchFiles();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setShowPopup(false), 6000);
        return () => clearTimeout(timer);
    }, []);

    return { showPopup, filesLinks };
};
