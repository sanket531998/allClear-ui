import { toast } from '@/components/ui/use-toast';

function Footer(){

  const year = new Date().getFullYear();

  const hanldeContactUs = async () => {
      try{
        await navigator.clipboard.writeText("allclear.live@gmail.com");
        toast({
          title: "Success",
          description: "Email address copied to clipboard. Kindly reach out to us at this email address. We will get back to you as soon as possible.",
          variant: "default"
        });
      }catch(e){
        console.error("Failed to copy email address", e);
        toast({
          title: "Error",
          description: "Failed to copy email address",
          variant: "destructive"
        });
      }


  }

    return <footer className="bg-news-primary text-white py-8 bg-gradient-to-b from-blue-400 to-blue-600">
        <div className="news-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ALLCLEAR News</h3>
              <p className="text-gray-300">
                Delivering clear, factual news from around the world.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><a href="/category/sports" className="text-gray-300 hover:text-white">Sports</a></li>
                <li><a href="/category/politics" className="text-gray-300 hover:text-white">Politics</a></li>
                <li><a href="/category/politics" className="text-gray-300 hover:text-white">Middle Class</a></li>
                <li><a href="/category/technology" className="text-gray-300 hover:text-white">Technology</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
              <ul className="space-y-2">
                <li><a href="https://www.facebook.com/share/167VsRhqi7/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Facebook</a></li>
                <li><a href="https://x.com/allclearlive?s=21&t=oF7HneQZPjK9SHIh-bAhvg" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">X</a></li>
                <li><a href="https://www.instagram.com/allclear.live?igsh=cGcxcnN3bnZsNjFj&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Instagram</a></li>
                <li onClick={()=>{hanldeContactUs()}}><a className="text-gray-300 hover:text-white cursor-pointer">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-300">
            <p>© {year} ALLCLEAR News. All rights reserved.</p>
          </div>
        </div>
      </footer>
}

export default Footer;
