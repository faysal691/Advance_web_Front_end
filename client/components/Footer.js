const Footer = () => {
  return (
    <footer className="bg-slate-100 shadow dark:bg-slate-900 w-full border-t mt-8">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <span className="block text-sm text-slate-600 sm:text-center dark:text-slate-200">
          © 2023{" "}
          <a href="/" className="hover:underline">
            HMS
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
