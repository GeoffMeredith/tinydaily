import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const templatesDir = path.join(__dirname, '../views/email');

export const renderTemplate = (templateName: string, data: Record<string, any>): string => {
    const templatePath = path.join(templatesDir, `${templateName}.html`);
    const template = fs.readFileSync(templatePath, 'utf8');
    return ejs.render(template, data);
}; 