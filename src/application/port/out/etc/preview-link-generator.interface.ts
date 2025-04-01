export interface PreviewLinkGenerator {
  generatePreviewLinkWithFilePath(
    filePath: string,
  ): Promise<{ previewLink: string }>;
}
