import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user: {
    full_name: string;
  };
}

interface ProjectCommentsProps {
  projectId: string;
  onCommentDeleted: () => void;
}

export function ProjectComments({ projectId, onCommentDeleted }: ProjectCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Fetching comments for project:", projectId);
    fetchComments();
  }, [projectId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const { data: comments, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          user:profiles(full_name)
        `)
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching comments:', error);
        throw error;
      }
      
      console.log("Fetched comments:", comments);
      setComments(comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Erro ao carregar comentários');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const confirmDelete = window.confirm("Tem certeza que deseja deletar este comentário?");
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      toast.success('Comentário deletado com sucesso!');
      onCommentDeleted();
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Erro ao deletar comentário');
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare className="h-4 w-4" />
        <h4 className="font-semibold">Comentários</h4>
      </div>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-2 rounded-md flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">{comment.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                {comment.user?.full_name} - {new Date(comment.created_at).toLocaleDateString()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteComment(comment.id)}
              className="text-red-500 hover:text-red-600 h-6 w-6"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-gray-500">Nenhum comentário ainda.</p>
        )}
      </div>
    </div>
  );
}