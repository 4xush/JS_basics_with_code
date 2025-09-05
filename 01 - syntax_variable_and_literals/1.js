function f() {
    return "abc";
}

export { f };

// This block runs only if the file is executed directly, not when imported
if (import.meta.url === `file://${process.argv[1]}`) {
    console.log(f());
}