import os

import json


def get_markdown_files(directory_path):
    files_list = []
    # os.walk returns a 3-tuple
    # root is directory_path
    # dirs is subdirectories
    # files are files in the directory
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.endswith(".md") and not (file.startswith("index")):
                files_list.append(os.path.join(root, file))
    return files_list


def main():
    directory_path = "docs/Spellcasting (Wiki linked)"
    markdown_files = get_markdown_files(directory_path)



    for file in markdown_files:
        # Open the file for reading and writing
        with open(file, "r+") as f:
            # Read the contents of the file
            lines = list(f)
        print(lines)
        

if __name__ == "__main__":
    main()
