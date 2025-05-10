
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Users, MessageSquare, Heart, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface Post {
  id: number;
  author: {
    name: string;
    avatar?: string;
    level: number;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  image?: string;
  category: string;
}

interface Comment {
  id: number;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
}

export function CommunityForum() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [commentText, setCommentText] = useState<string>("");
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [newPostContent, setNewPostContent] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: "Carlos Silva",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop",
        level: 5
      },
      content: "Finalmente completei 4 semanas seguindo o plano à risca! Os resultados já estão aparecendo, especialmente nos braços e ombros.",
      timestamp: "2h atrás",
      likes: 12,
      comments: [
        {
          id: 1,
          author: { name: "Ana Costa" },
          content: "Parabéns! Qual treino você está seguindo?",
          timestamp: "1h atrás"
        },
        {
          id: 2,
          author: { name: "Carlos Silva" },
          content: "Estou no plano de ganho de massa com 5 dias por semana!",
          timestamp: "30min atrás"
        }
      ],
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1740&auto=format&fit=crop",
      category: "progress"
    },
    {
      id: 2,
      author: {
        name: "Mariana Alves",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop",
        level: 3
      },
      content: "Alguém tem dicas para diminuir dores nas costas durante o levantamento terra? Estou tendo dificuldades com a postura.",
      timestamp: "5h atrás",
      likes: 8,
      comments: [
        {
          id: 3,
          author: { name: "Pedro Mendes" },
          content: "Tente trabalhar mais na mobilidade do quadril antes do exercício e certifique-se de manter as costas retas.",
          timestamp: "4h atrás"
        }
      ],
      category: "question"
    },
    {
      id: 3,
      author: {
        name: "Rafael Gomes",
        level: 7
      },
      content: "Adicionei ovos e abacate no café da manhã e a diferença na energia durante o dia é incrível! Recomendo para quem está buscando mais energia para treinar à tarde.",
      timestamp: "1d atrás",
      likes: 24,
      comments: [],
      category: "nutrition"
    }
  ]);
  
  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 } 
        : post
    ));
    
    toast({
      title: "Post curtido",
      description: "Sua curtida foi registrada.",
    });
  };
  
  const handleSetActivePost = (post: Post) => {
    setActivePost(post);
    setCommentText("");
  };
  
  const handleAddComment = () => {
    if (!commentText.trim() || !activePost) return;
    
    const newComment = {
      id: Math.floor(Math.random() * 1000),
      author: { name: "Você" },
      content: commentText,
      timestamp: "agora"
    };
    
    setPosts(posts.map(post => 
      post.id === activePost.id 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
    
    setActivePost({
      ...activePost,
      comments: [...activePost.comments, newComment]
    });
    
    setCommentText("");
    
    toast({
      title: "Comentário adicionado",
      description: "Seu comentário foi publicado.",
    });
  };
  
  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    
    const newPost: Post = {
      id: Math.floor(Math.random() * 1000),
      author: {
        name: "Você",
        level: 2
      },
      content: newPostContent,
      timestamp: "agora",
      likes: 0,
      comments: [],
      category: "progress"
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent("");
    
    toast({
      title: "Post criado",
      description: "Sua publicação foi compartilhada com a comunidade.",
    });
  };
  
  const filteredPosts = selectedCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);
  
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-corpoideal-purple flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Comunidade
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-corpoideal-purple hover:bg-corpoideal-darkpurple">Nova Publicação</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar nova publicação</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Textarea
                  placeholder="Compartilhe suas conquistas, dúvidas ou dicas com a comunidade..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={5}
                />
                <Button 
                  className="w-full bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
                  onClick={handleCreatePost}
                >
                  Publicar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="progress">Progressos</TabsTrigger>
            <TabsTrigger value="question">Dúvidas</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrição</TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedCategory} className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <div key={post.id} className="border rounded-lg overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium text-sm">{post.author.name}</p>
                          <span className="ml-2 text-xs bg-corpoideal-purple/10 text-corpoideal-purple px-1 rounded">
                            Nível {post.author.level}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{post.timestamp}</p>
                      </div>
                    </div>
                    
                    <p className="mb-3">{post.content}</p>
                    
                    {post.image && (
                      <div className="mb-3">
                        <img 
                          src={post.image} 
                          alt="Post" 
                          className="rounded-lg w-full max-h-64 object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex gap-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-600 flex gap-1"
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-600 flex gap-1"
                            onClick={() => handleSetActivePost(post)}
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments.length}</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Comentários</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="border-b pb-3">
                              <div className="flex items-start gap-3 mb-2">
                                <Avatar>
                                  <AvatarImage src={activePost?.author.avatar} />
                                  <AvatarFallback>
                                    {activePost?.author.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">{activePost?.author.name}</p>
                                  <p className="text-xs text-gray-500">{activePost?.timestamp}</p>
                                </div>
                              </div>
                              <p>{activePost?.content}</p>
                            </div>
                            
                            <div className="max-h-60 overflow-y-auto space-y-3">
                              {activePost?.comments.map(comment => (
                                <div key={comment.id} className="flex gap-2">
                                  <Avatar className="w-6 h-6">
                                    <AvatarFallback className="text-xs">
                                      {comment.author.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 bg-gray-50 p-2 rounded-lg">
                                    <div className="flex justify-between items-center">
                                      <p className="text-xs font-medium">{comment.author.name}</p>
                                      <span className="text-[10px] text-gray-500">{comment.timestamp}</span>
                                    </div>
                                    <p className="text-sm">{comment.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex gap-2 pt-2">
                              <Input
                                placeholder="Adicionar comentário..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                              />
                              <Button 
                                size="icon" 
                                className="bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
                                onClick={handleAddComment}
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">Nenhuma publicação nesta categoria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
