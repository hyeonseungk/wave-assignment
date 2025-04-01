export interface PreviewLinkGenerator {
  generatePreviewLink(
    file: { buffer: Buffer },
    fileName: string,
  ): Promise<{ previewLink: string }>;
}
