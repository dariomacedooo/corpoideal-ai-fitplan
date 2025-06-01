
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Users, MessageCircle, Heart, Share2, Trophy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Post {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  category: string;
}

export function CommunityForum() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Marina S.',
      avatar: 'MS',
      time: '2h atrás',
      content: 'Consegui bater minha meta de 10.000 passos hoje! Quem mais está no desafio?',
      likes: 12,
      comments: 3,
      category: 'Conquista'
    },
    {
      id: '2',
      author: 'Carlos R.',
      avatar: 'CR',
      time: '4h atrás',
      content: 'Alguém tem dicas para melhorar a forma no agachamento? Estou sentindo dor no joelho.',
      likes: 8,
      comments: 7,
      category: 'Dúvida'
    },
    {
      id: '3',
      author: 'Ana L.',
      avatar: 'AL',
      time: '6h atrás',
      content: 'Receita de smoothie pós-treino que tem me ajudado muito na recuperação!',
      likes: 15,
      comments: 5,
      category: 'Receita'
    }
  ]);
  
  const [newPost, setNewPost] = useState('');
  const { toast } = useToast();

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleShare = (postId: string) => {
    toast({
      title: "Post compartilhado",
      description: "O post foi compartilhado com seus amigos!",
    });
  };

  const handleNewPost = () => {
    if (!newPost.trim()) return;
    
    const post: Post = {
      id: Date.now().toString(),
      author: 'Você',
      avatar: 'VC',
      time: 'agora',
      content: newPost,
      likes: 0,
      comments: 0,
      category: 'Geral'
    };
    
    setPosts(prev => [post, ...prev]);
    setNewPost('');
    
    toast({
      title: "Post publicado",
      description: "Seu post foi compartilhado com a comunidade!",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-corpoideal-purple flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Comunidade CorpoIdeal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Compartilhe suas conquistas, dúvidas ou dicas..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[80px]"
            />
            <Button 
              onClick={handleNewPost}
              disabled={!newPost.trim()}
              className="bg-corpoideal-purple hover:bg-corpoideal-darkpurple"
            >
              Publicar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar>
                  <AvatarFallback>{post.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{post.author}</h4>
                    <span className="text-sm text-gray-500">{post.time}</span>
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-3">{post.content}</p>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-blue-500"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(post.id)}
                      className="text-gray-500 hover:text-green-500"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Compartilhar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-corpoideal-purple flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            Desafios da Semana
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">10.000 passos por dia</span>
              <Badge className="bg-green-100 text-green-800">Participando</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">5 treinos na semana</span>
              <Button variant="outline" size="sm">Participar</Button>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Beber 2L de água</span>
              <Button variant="outline" size="sm">Participar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
