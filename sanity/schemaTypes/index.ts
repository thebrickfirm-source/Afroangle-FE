import { articleType } from "./articleType";
import { commentType } from "./commentType";
import { authorType } from "./authorType";
import { categoryType } from "./categoryType";
import { videoUpload } from "./videoUpload";
import { socialLinkType } from "./socialLink";
import { socialMediaPost } from "./socialMediaPost";
import opinionPiece from "./opinionPiece";
export const schemaTypes = [
  articleType,
  authorType,
  categoryType,
  commentType,
  socialMediaPost,
  videoUpload,
  socialLinkType,
  opinionPiece,
];
