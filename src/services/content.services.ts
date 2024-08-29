import { JSDOM } from 'jsdom';

export default function parseHtmlToContentBlocks(htmlContent: string) {
    const dom = new JSDOM(htmlContent);
    const blocks: any[] = [];

    const walk = (node: any) => {
        switch (node.nodeName) {
            case 'P':
                blocks.push({
                    type: 'text',
                    content: node.textContent,
                });
                break;
            case 'IMG':
                blocks.push({
                    type: 'image',
                    src: node.getAttribute('src'),
                });
                break;
            case 'VIDEO':
                blocks.push({
                    type: 'video',
                    src: node.getAttribute('src'),
                });
                break;
            case 'H1':
            case 'H2':
            case 'H3':
            case 'H4':
            case 'H5':
            case 'H6':
                blocks.push({
                    type: 'heading',
                    content: node.textContent,
                    level: parseInt(node.nodeName[1], 10),  // Extract level from tag name (H1 -> 1, H2 -> 2, etc.)
                });
                break;
            case 'A':
                blocks.push({
                    type: 'link',
                    content: node.textContent,
                    href: node.getAttribute('href'),
                });
                break;
            default:
                // Handle other node types if necessary
                break;
        }

        node.childNodes.forEach((child: any) => walk(child));
    };

    dom.window.document.body.childNodes.forEach((node: any) => walk(node));

    return blocks;
}
