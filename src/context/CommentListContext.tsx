import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { Comment } from '../type/comment.ts';

interface CommentContextProps {
  commentList: Comment[];
  setCommentList: Dispatch<SetStateAction<Comment[]>>;
  logout: () => void;
}

const CommentListContext = createContext<CommentContextProps | undefined>(undefined);

function CommentListProvider({ children }: { children: React.ReactNode }) {
  const [commentList, setCommentList] = useState<Comment[]>([]);

  const logout = () => {
    setCommentList([]);
    localStorage.removeItem('access_token');
  };

  return (
    <CommentListContext.Provider
      value={{
        commentList,
        setCommentList,
        logout,
      }}
    >
      {children}
    </CommentListContext.Provider>
  );
}

const useCommentListContext = () => {
  const context = useContext(CommentListContext);
  if (!context) {
    throw new Error(
      "useUserContext doit être utilisé à l'intérieur de UserProvider",
    );
  }
  return context;
};

export { CommentListContext, useCommentListContext, CommentListProvider };
