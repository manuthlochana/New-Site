import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Eye, ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ScrollReveal } from "@/hooks/useScrollReveal";

interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  featured_image_url: string;
  published_at: string;
  view_count: number;
  category_id: string;
  article_categories: { name: string; slug: string } | null;
}

const Docs = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Documentation - Manuth Lochana";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Read articles, tutorials, and insights about technology, development, and innovation from Manuth Lochana.");
    }
    
    fetchData();
  }, [selectedCategory]);

  const fetchData = async () => {
    setIsLoading(true);
    
    const { data: categoriesData } = await supabase
      .from('article_categories')
      .select('*')
      .order('name');

    if (categoriesData) {
      setCategories(categoriesData);
    }

    let query = supabase
      .from('articles')
      .select('*, article_categories(name, slug)')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (selectedCategory) {
      query = query.eq('category_id', selectedCategory);
    }

    const { data: articlesData, error } = await query;

    if (!error && articlesData) {
      setArticles(articlesData as Article[]);
    }
    
    setIsLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-muted border-t-foreground rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <ScrollReveal>
          <header className="max-w-4xl mb-12">
            <span className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-4 block">
              Knowledge Base
            </span>
            <h1 className="font-display text-display-md md:text-display-lg font-bold text-foreground tracking-tight mb-6">
              Articles &<br />
              <span className="text-muted-foreground">Insights</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Tutorials, thoughts, and deep dives into technology, development, and innovation.
            </p>
          </header>
        </ScrollReveal>

        {/* Category Filter */}
        {categories.length > 0 && (
          <ScrollReveal delay={50}>
            <nav className="flex flex-wrap gap-2 mb-12" aria-label="Article Categories">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  selectedCategory === null
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    selectedCategory === category.id
                      ? 'bg-foreground text-background'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </ScrollReveal>
        )}

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <ScrollReveal>
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No articles published yet. Check back soon!</p>
            </div>
          </ScrollReveal>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Articles">
            {articles.map((article, index) => (
              <ScrollReveal key={article.id} delay={index * 50}>
                <article>
                  <Link
                    to={`/docs/${article.slug}`}
                    className="group minimal-card overflow-hidden flex flex-col h-full"
                  >
                    {article.featured_image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={article.featured_image_url}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                    
                    <div className="p-6 flex flex-col flex-grow">
                      {article.article_categories && (
                        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">
                          {article.article_categories.name}
                        </span>
                      )}
                      
                      <h2 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-muted-foreground transition-colors flex-grow">
                        {article.title}
                      </h2>
                      
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {article.summary}
                      </p>
                      
                      <footer className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                        <time className="flex items-center gap-1" dateTime={article.published_at}>
                          <Calendar className="w-3 h-3" aria-hidden="true" />
                          {formatDate(article.published_at)}
                        </time>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" aria-hidden="true" />
                          {article.view_count}
                        </span>
                      </footer>
                    </div>
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default Docs;